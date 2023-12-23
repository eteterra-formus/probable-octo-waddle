# Page Tree API
This API returns a hardcoded list of pages as a structured tree.

simple API docs can be found by browsing the root.

please refer to the tests for more documentation about the API behaviours (configuration, routing, documentation)

the actual page tree itself has been separated from the API code, so we can extend it with additional logic later.

### Development

```
npm run dev
```

### Deploy

```
gcloud app deploy
```

Example Output:

```
gcloud app deploy
Services to deploy:

descriptor:                  [/home/enrico/page-tree/api/app.yaml]
source:                      [/home/enrico/page-tree/api]
target project:              [probable-octo-waddle]
target service:              [default]
target version:              [20231223t142243]
target url:                  [https://probable-octo-waddle.ts.r.appspot.com]
target service account:      [App Engine default service account]


Do you want to continue (Y/n)?  y

Beginning deployment of service [default]...
Created .gcloudignore file. See `gcloud topic gcloudignore` for details.
╔════════════════════════════════════════════════════════════╗
╠═ Uploading 28 files to Google Cloud Storage               ═╣
╚════════════════════════════════════════════════════════════╝
File upload done.
Updating service [default]...done.                                                                                                                               
Setting traffic split for service [default]...done.                                                                                                              
Deployed service [default] to [https://probable-octo-waddle.ts.r.appspot.com]

You can stream logs from the command line by running:
  $ gcloud app logs tail -s default

To view your application in the web browser run:
  $ gcloud app browse
  ```