import "./index.css";
import "./ForegroundColors.tsx";
import Selectors from "./Selectors";
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import Corners from "./Corners";
import Dimension from "./Dimensions";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import { Container } from "react-bootstrap";
import BootstrapGrids from "./BootstrapGrids";
import 'bootstrap/dist/css/bootstrap.min.css';
import ScreenSizeLabel from "./ScreenSizeLabel";
import BootstrapTables from "./BootstrapTables";
import BootstrapLists from "./BootstrapLists";
import BootstrapForms from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";

export default function Lab2() {
  return (
    <Container>
        <h2>Lab 2 - Cascading Style Sheets</h2>
        <h3>Styling with the STYLE attribute</h3>
        <p >
            Style attribute allows configuring look and feel
            right on the element. Although its very convenient
            it is considered bad practice and you should avoid
            using the style attribute
        </p>
        <Selectors></Selectors>
        <ForegroundColors></ForegroundColors>
        <BackgroundColors></BackgroundColors>
        <Borders></Borders>
        <Padding></Padding>
        <Margins></Margins>
        <Corners></Corners>
        <Dimension></Dimension>
        <Positions></Positions>
        <Zindex></Zindex>
        <Float></Float>
        <GridLayout></GridLayout>
        <Flex></Flex>
        <BootstrapGrids></BootstrapGrids>
        <ScreenSizeLabel></ScreenSizeLabel>
        <BootstrapTables></BootstrapTables>
        <BootstrapLists></BootstrapLists>
        <BootstrapForms></BootstrapForms>
        <BootstrapNavigation></BootstrapNavigation>
    </Container>

);}
