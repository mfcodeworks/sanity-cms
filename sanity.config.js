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
                    apiId: 'xxxxx-yyyy-zzzz-xxxx-yyyyyyyy',
                    buildHookId: 'xxxyyyxxxyyyyxxxyyy',
                    name: 'sanity-gatsby-blog-20-studio',
                  },
                  {
                    title: 'Website',
                    apiId: 'yyyyy-xxxxx-zzzz-xxxx-yyyyyyyy',
                    buildHookId: 'yyyyxxxxxyyyxxdxxx',
                    name: 'sanity-gatsby-blog-20-web',
                    url: 'https://my-sanity-deployment.com',
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
