import React from 'react'
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import docs from './api_docs.yaml'

function ApiDocs() {
    return (
        <>
            <SwaggerUI url={docs} />
        </>
  )
}

export default ApiDocs
