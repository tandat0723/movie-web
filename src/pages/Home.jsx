import { Container, Grid, Heading, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchTrending, imagePath } from '../services/api'


const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchTrending('day')
            .then((res) => {
                setData(res)
            })
            .catch((err) => {
                console.log(err, 'err')
            })
    }, [])
    console.log(data)

    return (
        <Container maxW={'container.xl'}>
            <Heading as='h2' fontSize={'md'} textTransform={'uppercase'}>
                Trending
            </Heading>

            <Grid templateColumns={'repeat(5, 1fr)'}>
                {data && data?.map((item) => (
                    <Image key={item?.id} src={`${imagePath}/${item?.poster_path}`} />
                ))}
            </Grid>
        </Container>
    )
}

export default Home