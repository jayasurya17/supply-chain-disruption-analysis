import pandas as pd
import math
from os import listdir

def load_data(filename):
    return pd.read_csv(filename, low_memory=False)

def save_to_csv(df, filename):
	df.to_csv(filename, index=False)

def process_data(drugData):

	drugData = drugData[drugData['State'] != "XX"]
	drugData = drugData[drugData['Utilization Type'] == "FFSU"]
	drugData = drugData[drugData['Product Name'].isin(['FLUOXETINE', 'CHLORHEXID', 'PREDNISONE', 'DEXAMETHAS', 'PROMETHAZI', 'WARFARIN S', 'HEPARIN SO'])].reset_index()
	drugData.drop(['index', 'Utilization Type', 'Labeler Code', 'Product Code', 'Package Size', 'Supression Used', 'Suppression Used', 'ndc', 'Number of Prescriptions',  'Total Amount Reimbursed', 'Medicaid Amount Reimbursed', 'Non Medicaid Amount Reimbursed', 'Quarter Begin', 'Quarter Begin Date', 'Latitude', 'Longitude', 'Location', 'NDC'], axis = 1, errors='ignore', inplace = True)
	# drugData['Units Reimbursed'].fillna(0, inplace = True)
	drugData = drugData.dropna(axis=0, subset=['Units Reimbursed'])
	drugData['Product Name'] = drugData['Product Name'].str.upper() 
	drugData = drugData.groupby(['State', 'Year', 'Quarter', 'Product Name'])['Units Reimbursed'].sum().reset_index()

	return drugData


def find_percent_change(df, row):

	df = df.loc[(df['Year'] == row['Year'] - 1) & (df['Quarter'] == row['Quarter']) & (df['State'] == row['State']) & (df['Product Name'] == row['Product Name'])].reset_index()
	if len(df) > 0:
		prevValue = df['Units Reimbursed'][0]
		currValue = row['Units Reimbursed']
		# print (currValue, prevValue)
		percent = 0
		if prevValue != 0:
			percent = (currValue - prevValue) / prevValue
		percent  *= 100
		row['percent'] = percent
	return row


def add_percent_change(df):
	df['percent'] = 0
	df = df.apply(lambda x: find_percent_change(df, x), axis = 1)
	return df

def replace_states(df):
	state_code = {
	    "AL": "Alabama",
	    "AK": "Alaska",
	    "AS": "American Samoa",
	    "AZ": "Arizona",
	    "AR": "Arkansas",
	    "CA": "California",
	    "CO": "Colorado",
	    "CT": "Connecticut",
	    "DE": "Delaware",
	    "DC": "District Of Columbia",
	    "FM": "Federated States Of Micronesia",
	    "FL": "Florida",
	    "GA": "Georgia",
	    "GU": "Guam",
	    "HI": "Hawaii",
	    "ID": "Idaho",
	    "IL": "Illinois",
	    "IN": "Indiana",
	    "IA": "Iowa",
	    "KS": "Kansas",
	    "KY": "Kentucky",
	    "LA": "Louisiana",
	    "ME": "Maine",
	    "MH": "Marshall Islands",
	    "MD": "Maryland",
	    "MA": "Massachusetts",
	    "MI": "Michigan",
	    "MN": "Minnesota",
	    "MS": "Mississippi",
	    "MO": "Missouri",
	    "MT": "Montana",
	    "NE": "Nebraska",
	    "NV": "Nevada",
	    "NH": "New Hampshire",
	    "NJ": "New Jersey",
	    "NM": "New Mexico",
	    "NY": "New York",
	    "NC": "North Carolina",
	    "ND": "North Dakota",
	    "MP": "Northern Mariana Islands",
	    "OH": "Ohio",
	    "OK": "Oklahoma",
	    "OR": "Oregon",
	    "PW": "Palau",
	    "PA": "Pennsylvania",
	    "PR": "Puerto Rico",
	    "RI": "Rhode Island",
	    "SC": "South Carolina",
	    "SD": "South Dakota",
	    "TN": "Tennessee",
	    "TX": "Texas",
	    "UT": "Utah",
	    "VT": "Vermont",
	    "VI": "Virgin Islands",
	    "VA": "Virginia",
	    "WA": "Washington",
	    "WV": "West Virginia",
	    "WI": "Wisconsin",
	    "WY": "Wyoming"
	}
	df['state'] = df['state'].replace(state_code)
	return df

def replace_column_names(df):
	new_names = {
		"State": "state",
		"Year": "year",	
		"Quarter": "quarter",
		"Product Name": "commodity",
		"Units Reimbursed": "value",
		"percent": "percent"

	}
	df = df.rename(new_names, axis='columns')
	column_names = ['year', 'quarter', 'state', 'commodity', 'value', 'percent']
	df = df.reindex(columns=column_names)
	return df

if __name__ == "__main__":
	
	directory = "datasets/state_drug_utilization/"
	print ("Loading data from file..")
	allData = pd.DataFrame()

	count = pd.Series([], dtype = int)

	for index, file in enumerate(listdir(directory)):
		print ("Processing file: ", file)

		drugData = load_data(directory + file)
		drugData = process_data(drugData)
		allData = allData.append(drugData)


	print ("Calculating percentage change")
	allData = add_percent_change(allData)
	allData = replace_column_names(allData)
	allData = replace_states(allData)
	print (allData)
	save_to_csv(allData, "datasets/medicine_quarterly.csv")

# FLUOXETINE: It can treat depression, obsessive-compulsive disorder (OCD), bulimia nervosa, and panic disorder.
# CHLORHEXID: Topical antiseptic
# PREDNISONE: It can treat many diseases and conditions, especially those associated with inflammation
# DEXAMETHAS: It can treat inflammation 
# PROMETHAZI: It can treat allergies and motion sickness. This medication can also help control pain, nausea, and vomiting. 
# WARFARIN S: Helps to reduce the risk of a stroke or heart attack 
# HEPARIN SO: Specifically it is also used in the treatment of heart attacks and unstable angina.