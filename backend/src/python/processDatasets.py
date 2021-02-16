import pandas as pd
import math

def load_data(filename):
    return pd.read_csv(filename)

def save_to_csv(df, filename):
	df.to_csv(filename, index=False)

def process_data(productionData):

	productionData[['disasterType', 'endMonth', 'endYear']] = productionData[['disasterType', 'endMonth', 'endYear']].fillna(value='')
	productionData = productionData[productionData['year'] >= 2015].reset_index()
	quarters = {
		'JAN': 'Q1',
		'FEB': 'Q1', 
		'MAR': 'Q1', 
		'APR': 'Q2', 
		'MAY': 'Q2', 
		'JUN': 'Q2', 
		'JUL': 'Q3', 
		'AUG': 'Q3', 
		'SEP': 'Q3', 
		'OCT': 'Q4', 
		'NOV': 'Q4', 
		'DEC': 'Q4'
	}
	productionData['quarter'] = productionData['month'].apply(lambda x: quarters[x])
	del productionData['month']
	del productionData['category']
	del productionData['disasterType']
	del productionData['yearlyValue']
	del productionData['endMonth']
	del productionData['endYear']
	column_names = ['year', 'quarter', 'state', 'commodity', 'unit', 'value']
	productionData = productionData.reindex(columns=column_names)
	return productionData

def groupby_quarters(df):
	df = df.groupby(['year', 'quarter', 'state', 'commodity', 'unit']).agg({'value': 'sum'}).reset_index()
	return df

def find_percent_change(df, row):
	if row['year'] == 2015:
		return row

	df = df.loc[(df['year'] == row['year'] - 1) & (df['quarter'] == row['quarter']) & (df['state'] == row['state']) & (df['commodity'] == row['commodity']) & (df['unit'] == row['unit'])].reset_index()
	if len(df) > 0:
		prevValue = df['value'][0]
		currValue = row['value']
		percent = (currValue - prevValue) / prevValue
		percent  *= 100
		row['percent'] = percent
	return row


def add_percent_change(df):
	df['percent'] = 0
	df = df.apply(lambda x: find_percent_change(df, x), axis = 1)
	return df

def processDatasets():
	
	print ("Loading data from file..")
	productionData = load_data("datasets/processed_data.csv")

	print ("Pre processing data")
	productionData = process_data(productionData)

	print ("Grouping data into quarters")
	groupedData = groupby_quarters(productionData)

	print ("Finding percent change")
	processed_data = add_percent_change(groupedData)
	print (processed_data)

	print ("Saving data into file")
	save_to_csv(processed_data, "datasets/quarter_data.csv")
