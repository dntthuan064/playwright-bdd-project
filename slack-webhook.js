import { IncomingWebhook } from "@slack/webhook"
import dotenv from "dotenv"

// https://github.com/motdotla/dotenv
dotenv.config()

export default async function notifySlackOnPR(githubPayload) {
  let url
  try {
    if (!githubPayload?.pull_request || !githubPayload?.repository) {
      throw new Error("Invalid payload: missing pull_request or repository")
    }

    // Send notifications to a single channel which the user picks on installation
    // Sending messages using Incoming Webhooks: https://api.slack.com/messaging/webhooks

    // Do not store your slack webhook url in the source code, but pass your slack webhook url from environment variables
    // SLACK_WEBHOOK_URL: Notify channel, e.g: aqa_test_channel
    url = process.env.SLACK_WEBHOOK_URL
    if (!url) {
      throw new Error("SLACK_WEBHOOK_URL environment variable is not set")
    }
  
    const pullRequest = githubPayload
    const prTitle = pullRequest.title || "No Title"
    const prUrl = pullRequest.html_url
    const prAuthor = pullRequest.user?.login || "Unknown"

    const message = {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `@here 🚀 *A new pull request has been created*`
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Title:* ${prTitle}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*URL:* <${prUrl}>`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Author:* ${prAuthor}`
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Please help to review the changes* :thankyou2:`
          }
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "View Pull Request",
                emoji: true
              },
              url: prUrl,
              style: "primary"
            }
          ]
        }
      ]
    }

    const webhook = new IncomingWebhook(url)
    await webhook.send(message)
    console.log("✓ Slack notification sent successfully")
  } catch (error) {
    console.error("✗ Failed to send Slack notification:", error.message)
    throw error
  }

  // Add more Webhooks for different channels
  // url = process.env.SLACK_WEBHOOK_URL_2
  // const webhook = new IncomingWebhook(url)
  // await webhook.send(message)
  // console.log("✓ Slack notification sent successfully")
  // } catch (error) {
  //   console.error("✗ Failed to send Slack notification:", error.message)
  //   throw error
  // }
}

// // Execute when run directly (not imported)
// if (process.env.GITHUB_EVENT_JSON) {
//   try {
//     const payload = JSON.parse(process.env.GITHUB_EVENT_JSON)
//     await notifySlackOnPR(payload)
//   } catch (error) {
//     console.error("✗ Error:", error.message)
//     process.exit(1)
//   }
// }
