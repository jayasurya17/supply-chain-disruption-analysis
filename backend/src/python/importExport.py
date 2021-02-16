import pandas as pd
import csv

def get_df(sourceDirectory, ilename):
	imp = open(sourceDirectory + filename, 'r')
	out = open(sourceDirectory + "temp.csv" , 'w')
	writer = csv.writer(out)
	count = 0
	for row in csv.reader(imp):
		count += 1
		if count < 4:
			continue
		writer.writerow(row)
	imp.close()
	out.close()
	df = pd.read_csv(sourceDirectory + "temp.csv")
	return df

def clean_commodity(x):
	x = x.split(";")
	return x[0]

def clean_df(df):
	del df['Unnamed: 5']
	df.drop(df[df['State'] == "Unknown"].index, inplace = True)
	df.columns = ['State', 'Commodity', 'Continent', 'Year', 'Amount']
	df['Commodity'] = df['Commodity'].apply(lambda x: x[3:])
	df['Commodity'] = df['Commodity'].apply(lambda x: clean_commodity(x))
	return df

def save_to_csv(df, filename):	
	df.to_csv(filename, index=False)

def importExport():
    print ("Extracting data out of exports")
    sourceDirectory = "datasets/transport/"
    destinationDirectory = "datasets/"
    filename = "State_exports.csv"
    df = get_df(sourceDirectory, filename)
    df = clean_df(df)
    save_to_csv(df, destinationDirectory + filename)

    print ("Extracting data out of imports")
    filename = "State_imports.csv"
    df = get_df(sourceDirectory, filename)
    df = clean_df(df)
    save_to_csv(df, destinationDirectory + filename)