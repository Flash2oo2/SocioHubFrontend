import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { Carousel } from 'react-responsive-carousel';

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper >
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexBetween>

            {/* <img
                width="100%"
                height="auto"
                alt="advert"
                src="http://localhost:3001/assets/info3.jpeg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem" }}
            /> */}

            <img
                width="100%"
                height="auto"
                alt="advert"
                src="https://res.cloudinary.com/dljzfnas0/image/upload/v1720359646/fnbv3ignqourcobvge1a.jpg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem" }}
            />

            <FlexBetween>
                <Typography color={main}>TravelQATAR</Typography>
                <Typography color={medium}>travelqatar.com</Typography>

            </FlexBetween>
            <Typography color={medium}>
                Unlock the adventure of a lifetime with our tailor-made travel experiences – your dream destinations are just a click away!
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget;
