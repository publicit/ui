import { useEffect, useState } from 'react'
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react'
import { Search } from 'tabler-icons-react'

// Mantine :
import { Button, TextInput } from '@mantine/core'

// Components :
import PreLoader from '../components/PreLoader'
import { UserTable } from '../components/UserTable'

// Helpers :
import { isLoggedIn } from '../helpers/sso_service'
import { PostUserList, UserListParams } from '../helpers/api'

// Models :
import { User } from '../models/user'

export function UsersList() {
    const [email, setEmail] = useState('')
    const [offset, setOffset] = useState(0)
    const [rows, setRows] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isTableLoading, setIsTableLoading] = useState<boolean>(false)
    const limit = 10

    useEffect(() => {
        loadData()
    }, [offset])

    async function loadData() {
        try {
            setIsTableLoading(true)
            const params: UserListParams = {
                limit,
                offset,
                emails: [],
            }
            if (email.length !== 0) {
                params.emails.push(email)
            }
            const data = await PostUserList(params)
            setRows(data)
            setIsTableLoading(false)
        } catch (e) {
            console.error(e)
            setIsTableLoading(false)
        } finally {
            setIsLoading(false)
            setIsTableLoading(false)
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await loadData()
    }

    const shouldBackButtonDisabled = offset <= 0 && email.length === 0
    if (!isLoggedIn()) return null

    return isLoading ? (
        <PreLoader />
    ) : (
        <div className="user-list-container">
            <h1>Listado de Usuarios</h1>
            <form className="table-search" onSubmit={(e) => handleSubmit(e)}>
                <TextInput
                    className="search-input"
                    value={email}
                    rightSection={
                        <Search
                            size={18}
                            strokeWidth={2}
                            color="#fff"
                            cursor="pointer"
                            onClick={(e) => handleSubmit(e)}
                        />
                    }
                    label="Buscar por Email"
                    placeholder="john.doe@example.com"
                    description="Si hay coincidencias exactas, se mostrara el usuario que coincida con este email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </form>
            <UserTable rows={rows} isTableLoading={isTableLoading} />
            <div className="action-buttons">
                <Button
                    className="back-button"
                    size="md"
                    type="button"
                    variant="outline"
                    disabled={shouldBackButtonDisabled}
                    onClick={() => {
                        setOffset(offset - limit)
                        setEmail('')
                    }}
                >
                    <IconArrowNarrowLeft className="icon" />
                    Anterior
                </Button>
                <Button
                    className="next-button"
                    size="md"
                    type="button"
                    variant="outline"
                    disabled={rows.length < limit}
                    onClick={async () => {
                        setOffset(offset + limit)
                    }}
                >
                    Siguiente <IconArrowNarrowRight className="icon" />
                </Button>
            </div>
        </div>
    )
}
