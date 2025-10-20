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
    // Validate payload structure
    if (!githubPayload || typeof githubPayload !== "object") {
      console.error("[SLACK NOTIFIER] Invalid payload: expected an object.")
      return
    }

    // Get the Slack Webhook URL from environment variables
    // SLACK_WEBHOOK_URL should be stored as a secret, not in your code.
    const url = process.env.SLACK_WEBHOOK_URL
    if (!url) {
      console.error("[SLACK NOTIFIER] SLACK_WEBHOOK_URL is not defined. Please set it in your environment variables.")
      return
    }

    // Validate required fields in payload
    const { pull_request, repository } = githubPayload
    if (!pull_request || !repository) {
      console.error("[SLACK NOTIFIER] Invalid payload: missing pull_request or repository.")
      return
    }

    // Extract the relevant data from the GitHub payload
    const prTitle = pull_request.title || "No Title"
    const prUrl = pull_request.html_url
    const prAuthor = pull_request.user?.login || "Unknown"

    // Build the rich message for Slack using Block Kit
    const blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `🚀 *A new Pull Request has been created* 🚀`
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
          text: `*URL:* ${prUrl}`
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
          text: `*Please help to review!* :thankyou2:`
        }
      }
    ]

    // Add action button
    blocks.push({
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
    })

    const message = { blocks }

    // Send the message to Slack
    const webhook = new IncomingWebhook(url)
    await webhook.send(message)
    console.log("[SLACK NOTIFIER] Successfully sent PR notification to Slack.")
  } catch (err) {
    console.error("[SLACK NOTIFIER] Failed to send notification to Slack channel.")
    console.error(err)
    throw err
  }
}

export default notifySlackOnPR
