import { Container, Heading } from "@chakra-ui/react"

function Shows() {
    return (
        <Container maxW={'container.xl'}>
            <Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'}>
               Show TV
            </Heading>
        </Container>
    )
}

export default Shows