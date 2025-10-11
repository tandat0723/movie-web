import { Container, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import Card from "../../components/Card";

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchMovies()
      .then((res) => {
        console.log(res, 'res')
        setMovies(res?.results)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])


  return (
    <Container maxW={'container.xl'}>
      <Heading as={'h2'} fontSize={'md'} textTransform={'uppercase'}>
        Discover Movies
      </Heading>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {movies &&
          movies?.map((item, index) =>
            isLoading ? (
              <Skeleton height={300} key={index} />
            ) : (
              <Card
                key={item?.id}
                item={item}
                type={'movie'} />
            )
          )}
      </Grid>
    </Container>
  )
}

export default Movies