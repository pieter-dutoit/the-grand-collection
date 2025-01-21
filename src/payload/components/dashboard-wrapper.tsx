import React from 'react'

import { Gutter } from '@payloadcms/ui'

import revalidateAllPaths from '../utils/revalidate-all-paths'

function DashboardWrapper(): JSX.Element {
  return (
    <Gutter>
      <h1>Payload CMS</h1>
      <h2>The Grand Collection</h2>

      <hr />

      <section style={{ marginTop: '4rem' }}>
        <h3>Publish changes</h3>
        <p>
          This action will make all changes in the CMS live on the website.{' '}
          <br />
          Drafts will not be published.
        </p>
        <br />
        <em>
          All website pages will take ~10 to 15 seconds to load after changes
          are published.
        </em>
        <br />
        <button onClick={revalidateAllPaths} style={{ marginTop: '2rem' }}>
          Publish all changes
        </button>
      </section>
    </Gutter>
  )
}

export default DashboardWrapper
