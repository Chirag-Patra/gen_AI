from flask import Flask, request, jsonify
import snowflake.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure Snowflake connection
def create_snowflake_connection():
    return snowflake.connector.connect(
    account="carelon-eda_preprod.privatelink",
    user="AN666554AD",
    password="Hyder@12345",
    role="POC_SPC_SNOWPARK_CONTAINER_ROLE",
    warehouse="POC_SPC_SNOWPARK_WH",
    database="POC_SPC_SNOWPARK_DB",
    schema="DATA_SCHEMA"
    )



@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json.get('input', '')
    #print(user_input)
    #user_input = "Hello-world"
    query = f"""SELECT SNOWFLAKE.CORTEX.COMPLETE(
        'llama3.1-8b', 
        concat( 'You are powerful assistant in providing correct answers

                )', 
            'Question: ', 
            '{user_input}',
            'Answer: '
            )
            ) as  llm_response;"""
    try:
        conn = create_snowflake_connection()
        cursor = conn.cursor()
        
        # Example query to call LLM (modify based on your actual usage)
        #cursor.execute(f"SELECT some_llm_function('{user_input}') AS response")
        #cursor.execute(f"SELECT SNOWFLAKE.CORTEX.EMBED_TEXT_768('e5-base-v2', '{user_input}') AS response;")
        #cursor.execute(f"SELECT 1")
        cursor.execute(query)


        result = cursor.fetchone()
        print(result)
        
        return jsonify({"response": result[0]})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
    #app.run()