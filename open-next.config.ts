import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import kvIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache'
import memoryQueue from '@opennextjs/cloudflare/overrides/queue/memory-queue'

// トップページはお知らせ（WordPress）と体験の受付状況（Supabase）を1時間ごとに読み直す（revalidate: 3600）。
// その作り直した結果を KV に置き、読み直しは同じ Worker への呼び出し（WORKER_SELF_REFERENCE）で行う
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: memoryQueue,
})
