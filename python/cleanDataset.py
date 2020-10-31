import csv
import os

folder = "Datasets/"

for fileName in os.listdir(folder):
	if fileName.endswith(".csv"):
		newFile = open(folder + fileName[:-4] + '_cleaned.csv', 'w', newline='\n')
		writer = csv.writer(newFile, delimiter =  ",")

		csvfile = open(folder + fileName, newline='')
		fileData = csv.reader(csvfile, delimiter=',')

		for row in fileData:
			writer.writerow(row)
			break

		print ("Cleaning file " + fileName)

		for row in fileData:
			if row[1] == 'United States of America':
				writer.writerow(row)