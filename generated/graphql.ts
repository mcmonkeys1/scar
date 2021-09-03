import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

/** Representation of a value transfer between wallets, in both winson and ar. */
export type Amount = {
  __typename?: 'Amount'
  /** Amount as a winston string e.g. \`"1000000000000"\`. */
  winston: Scalars['String']
  /** Amount as an AR string e.g. \`"0.000000000001"\`. */
  ar: Scalars['String']
}

export type Block = {
  __typename?: 'Block'
  /** The block ID. */
  id: Scalars['ID']
  /** The block timestamp (UTC). */
  timestamp: Scalars['Int']
  /** The block height. */
  height: Scalars['Int']
  /** The previous block ID. */
  previous: Scalars['ID']
}

/**
 * Paginated result set using the GraphQL cursor spec,
 * see: https://relay.dev/graphql/connections.htm.
 */
export type BlockConnection = {
  __typename?: 'BlockConnection'
  pageInfo: PageInfo
  edges: Array<BlockEdge>
}

/** Paginated result set using the GraphQL cursor spec. */
export type BlockEdge = {
  __typename?: 'BlockEdge'
  /**
   * The cursor value for fetching the next page.
   *
   * Pass this to the \`after\` parameter in \`blocks(after: $cursor)\`, the next page will start from the next item after this.
   */
  cursor: Scalars['String']
  /** A block object. */
  node: Block
}

/** Find blocks within a given range */
export type BlockFilter = {
  /** Minimum block height to filter from */
  min?: Maybe<Scalars['Int']>
  /** Maximum block height to filter to */
  max?: Maybe<Scalars['Int']>
}

/**
 * The data bundle containing the current data item.
 * See: https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-102.md.
 */
export type Bundle = {
  __typename?: 'Bundle'
  /** ID of the containing data bundle. */
  id: Scalars['ID']
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

/** Basic metadata about the transaction data payload. */
export type MetaData = {
  __typename?: 'MetaData'
  /** Size of the associated data in bytes. */
  size: Scalars['String']
  /** Type is derrived from the \`content-type\` tag on a transaction. */
  type?: Maybe<Scalars['String']>
}

/** Representation of a transaction owner. */
export type Owner = {
  __typename?: 'Owner'
  /** The owner's wallet address. */
  address: Scalars['String']
  /** The owner's public key as a base64url encoded string. */
  key: Scalars['String']
}

/** Paginated page info using the GraphQL cursor spec. */
export type PageInfo = {
  __typename?: 'PageInfo'
  hasNextPage: Scalars['Boolean']
}

/**
 * The parent transaction for bundled transactions,
 * see: https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-102.md.
 */
export type Parent = {
  __typename?: 'Parent'
  id: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  /** Get a transaction by its id */
  transaction?: Maybe<Transaction>
  /** Get a paginated set of matching transactions using filters. */
  transactions: TransactionConnection
  block?: Maybe<Block>
  blocks: BlockConnection
}

export type QueryTransactionArgs = {
  id: Scalars['ID']
}

export type QueryTransactionsArgs = {
  ids?: Maybe<Array<Scalars['ID']>>
  owners?: Maybe<Array<Scalars['String']>>
  recipients?: Maybe<Array<Scalars['String']>>
  tags?: Maybe<Array<TagFilter>>
  bundledIn?: Maybe<Array<Scalars['ID']>>
  block?: Maybe<BlockFilter>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  sort?: Maybe<SortOrder>
}

export type QueryBlockArgs = {
  id?: Maybe<Scalars['String']>
}

export type QueryBlocksArgs = {
  ids?: Maybe<Array<Scalars['ID']>>
  height?: Maybe<BlockFilter>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  sort?: Maybe<SortOrder>
}

/** Optionally reverse the result sort order from `HEIGHT_DESC` (default) to `HEIGHT_ASC`. */
export enum SortOrder {
  /** Results are sorted by the transaction block height in ascending order, with the oldest transactions appearing first, and the most recent and pending/unconfirmed appearing last. */
  HeightAsc = 'HEIGHT_ASC',
  /** Results are sorted by the transaction block height in descending order, with the most recent and unconfirmed/pending transactions appearing first. */
  HeightDesc = 'HEIGHT_DESC',
}

export type Tag = {
  __typename?: 'Tag'
  /** UTF-8 tag name */
  name: Scalars['String']
  /** UTF-8 tag value */
  value: Scalars['String']
}

/** Find transactions with the folowing tag name and value */
export type TagFilter = {
  /** The tag name */
  name: Scalars['String']
  /**
   * An array of values to match against. If multiple values are passed then transactions with _any_ matching tag value from the set will be returned.
   *
   * e.g.
   *
   * \`{name: "app-name", values: ["app-1"]}\`
   *
   * Returns all transactions where the \`app-name\` tag has a value of \`app-1\`.
   *
   * \`{name: "app-name", values: ["app-1", "app-2", "app-3"]}\`
   *
   * Returns all transactions where the \`app-name\` tag has a value of either \`app-1\` _or_ \`app-2\` _or_ \`app-3\`.
   */
  values: Array<Scalars['String']>
  /** The operator to apply to to the tag filter. Defaults to EQ (equal). */
  op?: Maybe<TagOperator>
}

/** The operator to apply to a tag value. */
export enum TagOperator {
  /** Equal */
  Eq = 'EQ',
  /** Not equal */
  Neq = 'NEQ',
}

export type Transaction = {
  __typename?: 'Transaction'
  id: Scalars['ID']
  anchor: Scalars['String']
  signature: Scalars['String']
  recipient: Scalars['String']
  owner: Owner
  fee: Amount
  quantity: Amount
  data: MetaData
  tags: Array<Tag>
  /** Transactions with a null block are recent and unconfirmed, if they aren't mined into a block within 60 minutes they will be removed from results. */
  block?: Maybe<Block>
  /**
   * Transactions with parent are Bundled Data Items as defined in the ANS-102 data spec. https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-102.md
   * @deprecated Use `bundledIn`
   */
  parent?: Maybe<Parent>
  /**
   * For bundled data items this references the containing bundle ID.
   * See: https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-102.md
   */
  bundledIn?: Maybe<Bundle>
}

/**
 * Paginated result set using the GraphQL cursor spec,
 * see: https://relay.dev/graphql/connections.htm.
 */
export type TransactionConnection = {
  __typename?: 'TransactionConnection'
  pageInfo: PageInfo
  edges: Array<TransactionEdge>
}

/** Paginated result set using the GraphQL cursor spec. */
export type TransactionEdge = {
  __typename?: 'TransactionEdge'
  /**
   * The cursor value for fetching the next page.
   *
   * Pass this to the \`after\` parameter in \`transactions(after: $cursor)\`, the next page will start from the next item after this.
   */
  cursor: Scalars['String']
  /** A transaction object. */
  node: Transaction
}

export type ListBlocksQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
}>

export type ListBlocksQuery = {
  __typename?: 'Query'
  blocks: {
    __typename?: 'BlockConnection'
    pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean }
    edges: Array<{
      __typename?: 'BlockEdge'
      cursor: string
      node: {
        __typename?: 'Block'
        id: string
        timestamp: number
        height: number
        previous: string
      }
    }>
  }
}

export const ListBlocksDocument = gql`
  query listBlocks($after: String) {
    blocks(after: $after, first: 100) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          timestamp
          height
          previous
        }
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    listBlocks(
      variables?: ListBlocksQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<ListBlocksQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ListBlocksQuery>(ListBlocksDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'listBlocks',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>