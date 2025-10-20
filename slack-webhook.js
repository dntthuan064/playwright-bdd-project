import { IncomingWebhook } from "@slack/webhook"
import dotenv from "dotenv"

dotenv.config()

/**
 * Sends a Slack notification for a newly created GitHub Pull Request.
 * @param {object} githubPayload The full JSON payload from the GitHub 'pull_request' event.
 * @returns {Promise<void>}
 */
async function notifySlackOnPR(githubPayload) {
  try {
    if (!githubPayload?.pull_request || !githubPayload?.repository) {
      throw new Error("Invalid payload: missing pull_request or repository")
    }

    const url = process.env.SLACK_WEBHOOK_URL
    if (!url) {
      throw new Error("SLACK_WEBHOOK_URL environment variable is not set")
    }

    const { pull_request, repository } = githubPayload
    const prTitle = pull_request.title || "No Title"
    const prUrl = pull_request.html_url
    const prAuthor = pull_request.user?.login || "Unknown"

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
}

// Execute when run directly (not imported)
if (process.env.GITHUB_EVENT_JSON) {
  try {
    const payload = JSON.parse(process.env.GITHUB_EVENT_JSON)
    await notifySlackOnPR(payload)
  } catch (error) {
    console.error("✗ Error:", error.message)
    process.exit(1)
  }
}

export default notifySlackOnPR
