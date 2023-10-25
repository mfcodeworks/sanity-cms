// sanity.config.js
import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import {media} from 'sanity-plugin-media';
import {codeInput} from '@sanity/code-input';
import { dashboardTool } from "@sanity/dashboard";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";
import schemas from './schemas/schema'

export default defineConfig({
    title: "Portfolio",
    projectId: "682knlgh",
    dataset: "production",
    plugins: [
        deskTool(),
        visionTool(),
        // "dark-mode",
        media(),
        codeInput(),
        dashboardTool({
          widgets: [
            netlifyWidget({
                title: 'My Netlify deploys',
                sites: [
                  {
                    title: 'Sanity Studio',
                    apiId: '69049695-8e40-4751-88cb-b0b51654f25a',
                    buildHookId: '5ec0f81ae740ceb8cf1ec617',
                    name: 'amazing-heisenberg-f45ebc',
                    url: 'https://manage.mfcodeworks.com',
                  },
                  {
                    title: 'Portfolio',
                    apiId: 'dbe1fb39-4a37-4469-92f6-72131a1afc51',
                    buildHookId: '5ebea926ca4974bf3f355ad5',
                    name: 'blissful-mahavira-71a214',
                    url: 'https://mfcodeworks.com',
                  }
                ]
            })
          ]
        })
    ],
    tools: (prev) => {
      // 👇 Uses environment variables set by Vite in development mode
      if (import.meta.env.DEV) {
            return prev
      }
      return prev.filter((tool) => tool.name !== 'vision')
    },
    schema: {
        types: schemas,
    },
    document: {
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => templateItem.templateId != 'settings')
        }
        return prev
      },
      actions: (prev, { schemaType }) => {
        if (schemaType === 'settings') {
          return prev.filter(({ action }) => !['unpublish', 'delete','duplicate'].includes(action))
        }
        return prev
      },
    }
});
