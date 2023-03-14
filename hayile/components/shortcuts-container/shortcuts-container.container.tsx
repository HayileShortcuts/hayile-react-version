import React, { Component, useEffect } from "react";

export const ShortcutsContainer = () => {
  const fetchShortcuts = async () => {
    // show the info inside a div on the page
    const res = await fetch("http://localhost:9000/api/shortcuts/figma");
    const data = await res.json();
    return data;
  };

  type Shortcut = {
    // add the properties here
  };

  useEffect(() => {
    fetchShortcuts().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h1>Shortcuts Container</h1>
      <p>Shortcuts will be displayed here </p>
    </div>
  );
};
