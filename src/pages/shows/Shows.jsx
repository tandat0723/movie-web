import { Container, Flex, Grid, Heading, Select, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTvSeries } from "../../services/api";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";

const Shows = () => {
    const [shows, setShows] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activePage, setActivePage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [sortBy, setSortBy] = useState('popularity.desc')

    useEffect(() => {
        setIsLoading(true)
        fetchTvSeries(activePage, sortBy)
            .then((res) => {
                console.log(res, 'res')
                setShows(res?.results)
                setActivePage(res?.page)
                setTotalPages(res?.total_pages)
            })
            .catch((err) => console.log(err, 'err'))
            .finally(() => setIsLoading(false))
    }, [activePage, sortBy])


    return (
        <Container maxW={'container.xl'}>
            <Flex alignItems={'baseline'} gap={4} my={10}>
                <Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'}>
                    Discover TV Shows
                </Heading>

                <Select w={'130px'} onChange={(e) => {
                    setActivePage(1)
                    setSortBy(e.target.value)
                }}>
                    <option value='popularity.desc'>Popular</option>
                    <option value='vote_average.desc&vote_count.gte=1000'>Top Rating</option>
                </Select>
            </Flex>

            <Grid
                templateColumns={{
                    base: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(5, 1fr)",
                }}
                gap={"4"}
            >
                {shows &&
                    shows?.map((item, index) =>
                        isLoading ? (
                            <Skeleton height={300} key={index} />
                        ) : (
                            <Card key={item?.id} item={item} type={'tv'} />
                        )
                    )}
            </Grid>

            <Pagination activePage={activePage} totalPages={totalPages} setActivePage={setActivePage} />
        </Container>
    )
}

export default Shows