---
title: "@remotion/cloudrun"
source: https://www.remotion.dev/docs/cloudrun
---

# @remotion/cloudrun

EXPERIMENTAL

Cloud Run is in [Alpha status and not actively being developed.](/docs/cloudrun/status)

Render Remotion videos on [GCP Cloud Run](https://cloud.google.com/run).

## When should I use it?[​](#when-should-i-use-it "Direct link to When should I use it?")

- You are fine with using Google Cloud Platform in one of the [supported regions](/docs/cloudrun/region-selection).

If one of those constraints is a dealbreaker for you, resort to normal [server-side rendering](/docs/ssr).

## How it works[​](#how-it-works "Direct link to How it works")

### Deployment[​](#deployment "Direct link to Deployment")

- Any time a new version of Remotion is published by the Remotion team, a new image will be uploaded to a publicly readable artifact registry in GCP.
- When you deploy a new Cloud Run service to your GCP Project, it will by default download the latest image from the repository. If you require a specific version, you can specify that in the command.

### Rendering[​](#rendering "Direct link to Rendering")

- A Cloud Run service and a Cloud Storage bucket are created in GCP.
- A Remotion project gets deployed to a Cloud Storage bucket as a website.
- The Cloud Run service gets invoked and opens the Remotion project.
- The Cloud Run service renders the video or still, and the final file gets uploaded to Cloud Storage and is available for download.

## Architecture[​](#architecture "Direct link to Architecture")

- **Cloud Run service**: Contains the required libraries and binaries for rendering Remotion projects, and is available for invoking behind a URL.
- **Cloud Storage bucket**: Stores the projects, the renders, and render metadata.
- **CLI**: Allows control of the overall architecture from the command line. Is installed by adding `@remotion/cloudrun` to a project.
- **Node.JS API**: Has the same features as the CLI but is easier to use programmatically.

## Setup / Installation[​](#setup--installation "Direct link to Setup / Installation")

[**See here**](/docs/cloudrun/setup)

## Region selection[​](#region-selection "Direct link to Region selection")

The following regions are available for Remotion Cloud Run:

- `asia-east1`- `asia-east2`- `asia-northeast1`- `asia-northeast2`- `asia-northeast3`- `asia-south1`- `asia-south2`- `asia-southeast1`- `asia-southeast2`- `australia-southeast1`- `australia-southeast2`- `europe-central2`- `europe-north1`- `europe-southwest1`- `europe-west1`- `europe-west2`- `europe-west3`- `europe-west4`- `europe-west6`- `europe-west8`- `europe-west9`- `me-west1`- `northamerica-northeast1`- `northamerica-northeast2`- `southamerica-east1`- `southamerica-west1`- `us-central1`- `us-east1`- `us-east4`- `us-east5`- `us-south1`- `us-west1`- `us-west2`- `us-west3`- `us-west4`

[**See here for configurations and considerations.**](/docs/cloudrun/region-selection)

## Quotas and Limits[​](#quotas-and-limits "Direct link to Quotas and Limits")

For all up-to-date values, check the [official Cloud Run docs](https://cloud.google.com/run/quotas).

- The maximum memory size is 32gb.
- The maximum number of vCPUs is 8.
- The maximum writeable, in-memory filesystem, limited by instance memory, is 32gb.
- The maximum timeout is 60 minutes.

## Cost[​](#cost "Direct link to Cost")

Most of our users render multiple minutes of video for just a few pennies. The exact cost is dependent on the region, assigned memory, type of video and other parameters. You might also need a Remotion license (see below).

## GCP permissions[​](#gcp-permissions "Direct link to GCP permissions")

Remotion Cloud Run requires you to create a GCP project and create a Service Account with some permissions attached to it. We require only the minimal amount of permissions required for operating Remotion Cloud Run. [Service Account permission list and reasons](/docs/cloudrun/permissions).

## CLI[​](#cli "Direct link to CLI")

You can control Remotion Cloud Run using the `npx remotion cloudrun` command.

[**Read more about the CLI**](/docs/cloudrun/cli)

## Node.JS API[​](#nodejs-api "Direct link to Node.JS API")

Everything you can do using the CLI, you can also control using Node.JS APIs. See the reference [here](/docs/cloudrun/api).

## License[​](#license "Direct link to License")

The standard Remotion license applies: <https://github.com/remotion-dev/remotion/blob/main/LICENSE.md>

Companies needing a license and using cloud rendering must set it up with Cloud Rendering Units. Please visit: <https://remotion.pro/license>

## Uninstalling[​](#uninstalling "Direct link to Uninstalling")

We make it easy to remove all Remotion resources from your GCP project without leaving any traces or causing further costs.

[How to uninstall Remotion Cloud Run](/docs/cloudrun/uninstall).
