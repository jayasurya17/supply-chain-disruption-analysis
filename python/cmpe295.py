import pandas as pd
from sklearn.model_selection import train_test_split 
from sklearn.tree import DecisionTreeClassifier
from sklearn import metrics, tree
import math
import matplotlib.pyplot as plt

def load_data(filename):
    return pd.read_csv(filename)

def modify_data(df):
    for key, data in df.iteritems(): 
        if data.dtype != "int64" and data.dtype != "float64":
            number = 1
            for value in data.unique():
                df[key][df[key] == value] = number
                number += 1
    df['Value'] = df['Value'].fillna(0)
    df['Value'] = df['Value'] // 1000000
    df['Value'] = df['Value'].astype(int) 


def prep_training(data):
    # Splitting the dataset into train and test sets (test_size = 0.2)
    # see model_selection
    x = data.iloc[:, :9]
    y = data.iloc[:, 9:10]
    y = y.astype('int')
    return train_test_split(x, y, test_size = 0.20, random_state = 1000)

def save_graph(clf, filename):
    fig = plt.figure(figsize=(60,60))
    _ = tree.plot_tree(clf, filled=True)
    fig.savefig(filename)

def train_and_predict(x_train, x_test, y_train, y_test, max_depth):
    # Creating model
    clf = DecisionTreeClassifier(max_depth = max_depth)
    # Feed data into model
    clf = clf.fit(x_train, y_train)
    # Predict values for test data
    y_pred = clf.predict(x_test)
    # Visualize classifier
    save_graph(clf, "decistion_tree_depth_" + str(max_depth) + ".png")
    # Find training and testing accuracy
    accuracy = metrics.accuracy_score(y_test, y_pred)
    print ("Accuracy for depth", max_depth, ":", accuracy)
    return clf

def main():
    # Load data from CSV
    food_data = load_data('Datasets/Production_CropsProcessed_E_All_Data_(Normalized)_cleaned.csv')
    
    # Modify data to contain only numbers
    modify_data(food_data)
    print (food_data)

    x_train, x_test, y_train, y_test = prep_training(food_data)

    # 1. Decision Trees with max_depth = 2
    clf = train_and_predict(x_train, x_test, y_train, y_test, 2)

    # 2. Decision Trees with max_depth = 4
    clf = train_and_predict(x_train, x_test, y_train, y_test, 4)
    
    # 3. Decision Trees with max_depth = 6
    clf = train_and_predict(x_train, x_test, y_train, y_test, 6)
    
    # 4. Decision Trees with max_depth = 8
    clf = train_and_predict(x_train, x_test, y_train, y_test, 8)
    
    # 5. Decision Trees with max_depth = 10
    clf = train_and_predict(x_train, x_test, y_train, y_test, 10)
    
    # 6. Decision Trees with max_depth = 12
    clf = train_and_predict(x_train, x_test, y_train, y_test, 12)

if __name__ == "__main__":
    main()