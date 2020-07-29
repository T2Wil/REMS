export const getCharsAfterIndex = (index) => {
  return (input) => {
    const stringifiedInput = `${input}`;
    return stringifiedInput.slice(index);
  };
};
export const getCharsBeforeIndex = (index) => {
  return (input) => {
    const stringifiedInput = `${input}`;
    return stringifiedInput.slice(0, index).trim();
  };
};


export const updateSections = (sections, newSection) => {
  return sections.map((section) => {
    if (section.sectionId === newSection.sectionId) return newSection;
    else return section;
  });
};
