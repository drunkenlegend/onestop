import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Saloni',
        email: 'minion@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'saksham',
        email: 'shivi@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users
