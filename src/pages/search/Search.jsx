import { Container, Flex, Grid, Heading, Input, Skeleton, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { searchData } from '../../services/api'
import Pagination from '../../components/Pagination'
import Card from '../../components/Card'

const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    const [activePage, setActivePage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [tempSearchValue, setTempSearchValue] = useState('')
    const [totalPage, setTotalPage] = useState(1)
    const [data, setData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        searchData(searchValue, activePage)
            .then((res) => {
                console.log(res, 'res')
                setData(res?.results)
                setActivePage(res?.page)
                setTotalPage(res?.total_pages)
            })
            .catch((err) => console.log(err, 'err'))
            .finally(() => setIsLoading(false))
    }, [searchValue, activePage])

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchValue(tempSearchValue)
    }

    return (
        <Container maxW={'container.xl'}>
            <Flex alignItems={'baseline'} gap={4} my={10}>
                <Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'}>
                    Search
                </Heading>
            </Flex>

            <form onSubmit={handleSearch}>
                <Input
                    placeholder='Search movie, tv show,...'
                    _placeholder={{ color: 'gray.100' }}
                    value={tempSearchValue}
                    onChange={(e) => setTempSearchValue(e.target.value)}
                />
            </form>

            {isLoading && (
                <Flex justifyContent={'center'} mt={10}>
                    <Spinner size={'xl'} color='red' />
                </Flex>
            )}
            {data?.length === 0 && !isLoading && (
                <Heading textAlign={'center'} as={'h3'} fontSize={'sm'} mt={10}>
                    No results found
                </Heading>
            )}

            <Grid
                templateColumns={{
                    base: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(5, 1fr)",
                }}
                gap={"4"}
                mt={6}
            >
                {data?.length > 0 &&
                    !isLoading &&
                    data?.map((item, index) =>
                        isLoading ? (
                            <Skeleton height={300} key={index} />
                        ) : (
                            <Card
                                key={item?.id}
                                item={item}
                                type={item?.media_type} />
                        )
                    )}
            </Grid>

            {data?.length > 0 && !isLoading && (
                <Pagination
                    activePage={activePage}
                    totalPages={totalPage}
                    setActivePage={setActivePage}
                />
            )}
        </Container>
    )
}

export default Search