import pandas as pd
import math
from os import listdir

def load_data(filename):
    return pd.read_csv(filename)

def save_to_csv(df, filename):
	df.to_csv(filename, index=False)

def process_data(drugData):

	drugData = drugData[drugData['State'] != "XX"]
	drugData = drugData[drugData['Utilization Type'] == "FFSU"]
	drugData = drugData[drugData['Product Name'].isin(["V-C FORTE", "AZITHROMYC", "RITONAVIR", "CHLORHEXID", "CHLOROQUIN", "FLUXETINE", "LOPINAVIR", "ACTEMRA SC", "ORENITRAM", "ACTEMRA", "PREDNISONE"])].reset_index()
	drugData.drop(['index', 'Utilization Type', 'Labeler Code', 'Product Code', 'Package Size', 'Supression Used', 'Suppression Used', 'ndc', 'Number of Prescriptions',  'Total Amount Reimbursed', 'Medicaid Amount Reimbursed', 'Non Medicaid Amount Reimbursed', 'Quarter Begin', 'Quarter Begin Date', 'Latitude', 'Longitude', 'Location', 'NDC'], axis = 1, errors='ignore', inplace = True)
	drugData['Units Reimbursed'].fillna(0, inplace = True)
	drugData['Product Name'] = drugData['Product Name'].str.upper() 

	return drugData


def find_percent_change(df, row):
	if row['Year'] == 1996:
		return row

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

if __name__ == "__main__":
	
	directory = "datasets/state_drug_utilization/"
	print ("Loading data from file..")
	allData = pd.DataFrame()

	count = 0
	for file in listdir(directory):
		print ("Processing file: ", file)

		drugData = load_data(directory + file)
		drugData = process_data(drugData)
		allData = allData.append(drugData)
		count += 1
		if count == 3:
			break

	print (allData)
	allData = add_percent_change(allData)
	print (allData)
	save_to_csv(allData, "datasets/medicine_quarterly.csv")