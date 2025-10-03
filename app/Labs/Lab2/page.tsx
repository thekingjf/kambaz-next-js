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

export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p >
        Style attribute allows configuring look and feel
        right on the element. Although it's very convenient
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
    </div>

);}
