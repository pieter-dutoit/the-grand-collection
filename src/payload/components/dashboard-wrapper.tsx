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
        <h3>Apply Website Updates</h3>
        <p>
          This action will refresh the website to display all recent changes
          made in the CMS. <br />
          Drafts or unpublished content (e.g. Guesthouses) will remain hidden
          until published individually in the CMS.
        </p>
        <br />
        <em>
          Note: After applying updates, all website pages may take ~10 to 15
          seconds to fully refresh.
        </em>
        <br />
        <button onClick={revalidateAllPaths} style={{ marginTop: '2rem' }}>
          Apply Updates to Website
        </button>
      </section>
    </Gutter>
  )
}

export default DashboardWrapper
