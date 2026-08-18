---
title: Attribution
sidebar_position: 9
---

# Attribution

Fanar is built on [Redash](https://github.com/getredash/redash), an open-source
data querying and visualization tool, licensed under the BSD 2-Clause License.

The query editor, visualization library, dashboard grid, alerting, data source
connectors, permissions model, and REST API all originate in Redash. Fanar's
additions — the AI agent and Copilots, the semantic layer, business context and
golden queries, version history, multi-org, and Fanar Bridge — are built on top of
that foundation.

## Documentation

Parts of this site were originally adapted from the
[Redash knowledge base](https://github.com/getredash/website) (BSD 2-Clause), and
have since been revised for Fanar. Where a page still describes behaviour Fanar
inherits unchanged, the credit belongs upstream.

## License

```
BSD 2-Clause License

Copyright (c) 2013-2021, Redash contributors
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

## Other projects Fanar depends on

- [Cube](https://cube.dev) — powers the [semantic layer](../ask/semantic-layer)
- [LangGraph and LangChain](https://www.langchain.com/) — the agent workflows
- [Langfuse](https://langfuse.com/) — prompt management and tracing
- [FalkorDB](https://www.falkordb.com/) — schema graph retrieval
