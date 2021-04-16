import bcrypt from 'bcryptjs'

const users=[
	{
		name:'Admin user',
		email: 'admin@example.com'
		password: bcrypt.hashSync('123456',10),  //hash pw by hashsync
		isAdmin:true
	},
	{
		name:'Saloni',
		email: 'saloni@example.com'
		password: bcrypt.hashSync('123456',10),,
		
	},
	{
		name:'saksham',
		email: 'shivi@example.com'
		password: bcrypt.hashSync('123456',10),,
		
	},
]

export default users