import boto3
sns = boto3.client('sns')
db = boto3.resource('dynamodb')

def handler(event, context):
    if event['body'] == 'exception occured':
        response = sns.publish(
            TopicArn = '<TopciARN>',    # Topic ARN - available from console
            Message = 'Python message - error',
            Subject = 'Python subject - error occurred',
        )
        print(f'response : {response}')
    else:
        table = db.Table('PersonDetailsTable')

        print(f'table creation time: {table.creation_date_time}')

        table.put_item(
            Item = {
                'sinno': 123123123123,
                'name': 'xxx',
                'age': 44
            }
        )
