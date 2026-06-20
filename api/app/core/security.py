from datetime import datetime,timedelta
from jose import jwt
SECRET_KEY='CHANGE_ME'
ALGORITHM='HS256'
def create_access_token(data):
    payload=data.copy()
    payload['exp']=datetime.utcnow()+timedelta(hours=8)
    return jwt.encode(payload,SECRET_KEY,algorithm=ALGORITHM)
