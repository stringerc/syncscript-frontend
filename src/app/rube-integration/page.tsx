"use client";

import React from 'react';
import Head from 'next/head';
import RubeIntegrationHub from '../../components/RubeIntegrationHub';

export default function RubeIntegrationPage() {
  return (
    <>
      <Head>
        <title>Rube.app Integration Hub - SyncScript</title>
        <meta 
          name="description" 
          content="Connect SyncScript with Google Calendar, Outlook, Slack, and 600+ other apps via Rube.app" 
        />
      </Head>
      
      <RubeIntegrationHub />
    </>
  );
}
