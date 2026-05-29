---
title: "Parameterized videos"
source: https://www.remotion.dev/docs/parameterized-rendering
---

# Parameterized videos

Remotion allows for [ingesting](/docs/passing-props), [validating](/docs/schemas), [visually editing](/docs/visual-editing), and transforming data that may be used to parametrize a video.

Data may [influence the content](/docs/data-fetching) of the video, or the [metadata](/docs/dynamic-metadata) such as width, height, duration or framerate.

## High-level overview[​](#high-level-overview "Direct link to High-level overview")

Remotion allows the passing of [props](https://react.dev/learn/passing-props-to-a-component) to a React component.  
Props are a React concept and take the shape of a JavaScript object.

To determine the data which gets passed to the video, the following steps are taken:

[1](#1)

 **Default props** are defined statically, so that the video can be designed in the Studio without any data.   

- The default props define the shape of the data.- A schema can be defined and validated.- In absence of data, default props can be edited in the Remotion Studio.

[2](#2)

 **Input props** may be specified when rendering a video to override the default props.  

- Input props will be merged together with default props, where input props have priority.

[3](#3)

 **Using [`calculateMetadata()`](/docs/data-fetching)**, postprocessing of the props may be performed and metadata be dynamically calculated.  

- For example, given a URL is passed as a prop, it may be fetched and the content added to the props.- Asynchronous calculation of the video duration and other metadata is also possible here.

[4](#4)

 **The final props** are passed to the React component.

- The component may dynamically render content based on the props.

See [here](/docs/props-resolution) for a visual explanation and more details of how the resolution process works.

## Table of contents[​](#table-of-contents "Direct link to Table of contents")

- [Passing props](/docs/passing-props)
- [Defining a Schema](/docs/schemas)
- [Visual editing](/docs/visual-editing)
- [Data fetching](/docs/data-fetching)
- [Variable metadata](/docs/dynamic-metadata)
- [How props get resolved](/docs/props-resolution)

## See also[​](#see-also "Direct link to See also")

You can use the [Remotion Player](/docs/player) to display a Remotion component in a React app and dynamically change the content without rendering the video, to create experiences where the content updates in real-time.
