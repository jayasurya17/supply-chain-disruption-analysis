import pandas as pd

def load_data(filename):
    return pd.read_csv(filename)

# def get_unit(string):


def filter_values(df, category):
	df['Value'] = pd.to_numeric(df.Value.astype(str).str.replace(',',''), errors='coerce').fillna(0).astype(int)
	# df = df.rename(columns={"temp": "Value"})
	if 'Period' in df.columns:
		new = df[['Year', 'Period', 'State', 'Commodity', 'Data Item', 'Value']].copy()
		new = new.rename(columns={"Period": "Month"})
		new['Month'] = new['Month'].map({'JAN':1, 'FEB':2, 'MAR':3, 'APR':4, 'MAY':5, 'JUN':6, 'JUL':7, 'AUG':8, 'SEP':9, 'OCT':10, 'NOV':11, 'DEC':12 })
	else:
		new = df[['Year', 'State', 'Commodity', 'Data Item', 'Value']].copy()
		new['Value'] = new['Value'] / 12
	new = new[~new['State'].str.contains("OTHER STATES")]	
	new = new[~new['Data Item'].str.contains("\$")]	
	new[['Data Item','Unit']] = new['Data Item'].str.split("- PRODUCTION, MEASURED IN", expand=True)
	new['Category'] = category
	return new

def add_months(df):
	new = pd.DataFrame(columns = df.columns)
	new['Month'] = None
	for month in range(1, 13):
		temp = df
		temp['Month'] = month
		new = new.append(temp, ignore_index=True)
	return new

def get_states(location):
	# location = location.upper()
	states = ["Alaska",
	          "Alabama",
	          "Arkansas",
	          "American Samoa",
	          "Arizona",
	          "California",
	          "Colorado",
	          "Connecticut",
	          "District of Columbia",
	          "Delaware",
	          "Florida",
	          "Georgia",
	          "Guam",
	          "Hawaii",
	          "Iowa",
	          "Idaho",
	          "Illinois",
	          "Indiana",
	          "Kansas",
	          "Kentucky",
	          "Louisiana",
	          "Massachusetts",
	          "Maryland",
	          "Maine",
	          "Michigan",
	          "Minnesota",
	          "Missouri",
	          "Mississippi",
	          "Montana",
	          "North Carolina",
	          " North Dakota",
	          "Nebraska",
	          "New Hampshire",
	          "New Jersey",
	          "New Mexico",
	          "Nevada",
	          "New York",
	          "Ohio",
	          "Oklahoma",
	          "Oregon",
	          "Pennsylvania",
	          "Puerto Rico",
	          "Rhode Island",
	          "South Carolina",
	          "South Dakota",
	          "Tennessee",
	          "Texas",
	          "Utah",
	          "Virginia",
	          "Virgin Islands",
	          "Vermont",
	          "Washington",
	          "Wisconsin",
	          "West Virginia",
	          "Wyoming"]

	filteredStates = []
	for val in states:
		if val.upper() in location:
			filteredStates.append(val.upper())

	return ",".join(filteredStates)


def filterDisasterData(disasterData):
	disasterData['Location'] = disasterData['Location'].str.upper() 
	disasterData['Location'] = disasterData['Location'].fillna('')
	disasterData = disasterData.assign(State = lambda x: get_states(x['Location']))
	disasterData['States'] = disasterData['Location'].apply(get_states)
	disasterData = disasterData[['Year', 'Start Month','States', 'Disaster Type']].copy()
	disasterData['Start Month'] = disasterData['Start Month'].fillna(0)
	disasterData['Start Month'] = disasterData['Start Month'].astype(int)


	disasterData['States'] = disasterData['States'].str.split(',')
	disasterData = (disasterData
		 .set_index(['Year', 'Start Month', 'Disaster Type'])['States']
		 .apply(pd.Series)
		 .stack()
		 .reset_index()
		 .drop('level_3', axis=1)
		 .rename(columns={0:'State'}))
	# new_df = pd.DataFrame(disasterData.States.str.split(',').tolist(), index=disasterData.Year, disasterData).stack()
	# new_df = new_df.reset_index([0, 'Year'])
	# print (dd)
	
	disasterData = disasterData.rename(columns={"Start Month": "Month"})

	disasterData = disasterData.groupby(['Year', 'Month', 'State'])['Disaster Type'].apply(list).reset_index()
	disasterData['Disaster Type'] = disasterData['Disaster Type'].apply(lambda x: ",".join(x))
	# print (disasterData)
	# print (temp)
	return disasterData

def combineData(productionData, disasterData):
	mergedData = productionData.merge(disasterData, how='left', on=['Year', 'Month', 'State'])
	return mergedData

def replace_months(df):
	months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
	df['Month'] = df['Month'].apply(lambda x: months[x - 1])
	return df

def reorder(df):
	column_names = ['Year', 'Month', 'State', 'Category', 'Commodity', 'Data Item', 'Unit',	'Value', 'Disaster Type']
	df = df.reindex(columns=column_names)
	return df

def save_to_csv(df, filename):
	df.to_csv(filename, index=False)

def process_production_data(filename, category, disasterData):
	df = load_data(filename)
	filtered = filter_values(df, category)
	if 'Months' not in df.columns:
		months = add_months(filtered)
	else:
		months = filtered

	mergedData = combineData(months, disasterData)
	mergedData = replace_months(mergedData)
	mergedData = reorder(mergedData)
	return mergedData


if __name__ == "__main__":
	
	disasterData = load_data("datasets/disaster_data/disasterData.csv")
	disasterData = filterDisasterData(disasterData)

	cropsData = process_production_data("datasets/food_data/crops_production.csv", "Crop", disasterData)
	print ("Processed crop production")
	dairyData = process_production_data("datasets/food_data/dairy_production.csv", "Dairy", disasterData)
	print ("Processed dairy production")
	poultryData = process_production_data("datasets/food_data/poultry_production.csv", "Poultry", disasterData)
	print ("Processed poultry production")
	livestockData = process_production_data("datasets/food_data/livestock_production.csv", "Livestock", disasterData)
	print ("Processed livestock production")

	print ("\nSaving data into CSV..")
	mergedData = pd.concat([cropsData, dairyData, poultryData, livestockData], ignore_index=True)
	save_to_csv(mergedData, 'datasets/processed_data.csv')
	print (mergedData)

	rowsWithoutDisaster = mergedData['Disaster Type'].isna().sum()
	r, c = mergedData.shape
	percentWithDisaster = ((r - rowsWithoutDisaster) / r) * 100
	print ("\n\nPercentage of rows with disaster:", percentWithDisaster)
