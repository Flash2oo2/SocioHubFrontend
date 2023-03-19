import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form"
import FlexBetween from "../../components/FlexBetween";
import { Hub } from "@mui/icons-material";
const LoginPage = () => {

    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px");

    return (
        <Box>
            <Box width="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >

                <Hub fontSize="large" sx={{ mr: "0.75rem" }} />
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"

                >
                    Socio
                    <Typography
                        display="inline"
                        fontSize="32px"
                        fontWeight="bold"
                        color="grey">Hub</Typography>
                </Typography>


            </Box>

            <Box width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} >
                    SocioHub: Your Gateway to Inclusive Social Connections
                </Typography>
                <Form />


            </Box>
        </Box>
    );
};

export default LoginPage;