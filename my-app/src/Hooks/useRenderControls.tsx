import { useState } from "react";

export const useRenderControls = () => {
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isContactExpanded, setIsContactExpanded] = useState(false);

  return { isProjectsExpanded, setIsProjectsExpanded, isAboutExpanded, setIsAboutExpanded, isContactExpanded, setIsContactExpanded };
};
