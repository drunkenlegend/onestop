import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { deleteUser, listUsers } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete
    const deleteHandler = (id) => {
        if (window.confirm('Are You Sure?')) {
            dispatch(deleteUser(id))
        }
    }

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])
    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped responsive bordered hover className='table-sm'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? (
                                        <i
                                            className='fas fa-check'
                                            style={{ color: 'green' }}></i>
                                    ) : (
                                        <i
                                            className='fas fa-times'
                                            style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/user/${user._id}/edit`}>
                                        <Button
                                            className='btn-sm'
                                            variant='light'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        className='btn-sm'
                                        variant='danger'
                                        onClick={() => {
                                            deleteHandler(user._id)
                                        }}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen
