import { db } from "#db";

console.log("Databases:")

const databases = await db.admin().listDatabases();

databases.databases.forEach((database) => { 
console.log(`- ${database.name}`)
})

process.exit(0)