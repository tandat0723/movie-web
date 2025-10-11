import { Container, Flex, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const Search = () => {
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(searchValue, 'search')
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
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} />
            </form>
        </Container>
    )
}

export default Search