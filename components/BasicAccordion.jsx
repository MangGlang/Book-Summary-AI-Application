import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

const BasicAccordion = ({ title, body, panelNum }) => {
  return (
    <>
      <Accordion className="mx-auto">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${panelNum}a-content`}
          id={`panel${panelNum}a-header`}
          disableGutters="true"
        >
          <Typography variant="" className="text-2xl text-[#032b41] font-semibold font-sans py-2 text-left">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{body}</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default BasicAccordion;
