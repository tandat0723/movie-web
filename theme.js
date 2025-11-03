import { extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const styles = {
    global: (props) => ({
        body: {
            bg: mode("white", "gray.900")(props),
            color: mode("gray.800", "whiteAlpha.900")(props),
            transition: "background-color 0.2s ease, color 0.2s ease",
        }
    })
}

const theme = extendTheme({ config, styles })

export default theme