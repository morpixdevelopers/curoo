from motor.motor_asyncio import AsyncIOMotorClient

DB_NAME = 'Curoo'
MONGO_URL = "mongodb+srv://morpixdevelopers_db_user:BpKPQatswSgyN9z3@curoo.pqa9cm3.mongodb.net/?retryWrites=true&w=majority&appName=Curoo&tls=true"

client = AsyncIOMotorClient(
    MONGO_URL,
    tls=True,
    tlsAllowInvalidCertificates=True,  # use only for testing
)

db = client[DB_NAME]
