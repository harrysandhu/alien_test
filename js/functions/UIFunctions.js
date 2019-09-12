


export default async function getButtonContent(buttonState){
        if (buttonState) {
            return <TextDefault color="#fff">CONTINUE</TextDefault>;
        } else {
            return (
                <IconDefault
                    size="35px"
                    source={require("../../../assets/images/icons/loaderDefault.gif")}
                />
            );
        }
}
