import re
import joblib  

def predict_(text):
    def tokenizer(text):
        text = text.lower()
        text = re.sub(r'\n', ' ', text)
        text = re.sub(r',' , ' ' , text)
        text = re.sub(r'\.' , ' ' , text) 
        text = re.sub(r'-' , ' ' , text) 
        return text
    loaded_vectorizer = joblib.load("text_prediction/tfidf_vectorizer.pkl")
    loaded_model = joblib.load("text_prediction/model.pkl")

    text = tokenizer(text)
    text_idf = loaded_vectorizer.transform([text])
    prediction = loaded_model.predict(text_idf)

    return prediction[0]
