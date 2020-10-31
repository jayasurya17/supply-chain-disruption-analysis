import pandas as pd

def load_data(filename):
    return pd.read_csv(filename)

def filter_values(df):
	df['new'] = pd.to_numeric(df.Value.astype(str).str.replace(',',''), errors='coerce').fillna(0).astype(int)
	new = df[['Year', 'State', 'Commodity', 'Data Item', 'new']].copy()
	new = new.rename(columns={"new": "Value"})
	new['Value'] = new['Value'] / 12
	new = new[~new['Data Item'].str.contains("\$")]	
	new['Category'] = 'Crop'
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
	column_names = ['Year', 'Month', 'State', 'Category', 'Commodity', 'Data Item',	'Value', 'Disaster Type']
	df = df.reindex(columns=column_names)
	return df

def save_to_csv(df, filename):
	df.to_csv(filename, index=False)

def main():
	try:
		df = load_data("Datasets/crops_production.csv")
		filtered = filter_values(df)
		months = add_months(filtered)

		disasterData = load_data("Datasets/disasterData.csv")
		filteredDisasterData = filterDisasterData(disasterData)

		mergedData = combineData(months, filteredDisasterData)
		mergedData = replace_months(mergedData)
		mergedData = reorder(mergedData)


		print (mergedData)
		print (mergedData.isna().sum())
		save_to_csv(mergedData, 'mergedData.csv')

	except Exception as e:
		print (e)


if __name__ == "__main__":
	main()
