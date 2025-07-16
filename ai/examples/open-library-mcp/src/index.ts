import {z} from 'zod';

import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({name: 'mcp-open-library', version: '1.0.0'});

server.tool(
    'search_books',
    `Search for books on the Open Library API.
        Use the following format:

        q=title:flammable will find any books with "flammable" in the title field
        q=author:solnit will find authors with "solnit" in their name
        q=subject:tennis rules will find any books about "tennis" AND "rules"
        q=place:lisbon will find books about Lisbon
        q=person:rosa parks will look for people with rosa AND parks in their name
        q=language:spa will find any books with at least one edition in Spanish (most other language codes use the first three letters of the language except for Japanese which uses jpn There is also mul for multiple languages and und for undetermined)
        q=publisher:harper will looks for any books published by a publisher with "harper" in their name. (Publisher has never been a controlled field in the library world, so you can see we have a ton of variants of this famous publisher in the search facets.)
        q=publish_year:[* TO 1800] will find anything published before and up to the year 1800.

        You can also blend them together:

        q=subject:travel place:istanbul will look for books about travel in Istanbul.
        q=subject:dogs subject:("Juvenile fiction" OR "Juvenile literature") will look for children's books about dogs.
    `,
    {
        q: z.string(),
    },
    async ({q}) => {
        const data = await fetch(
            `https://openlibrary.org/search.json?q=${q}&limit=20`,
        );
        const json = await data.json();

        let books = [];

        if (json?.docs?.length > 0) {
            books = json.docs.map((book: any) => {
                const title = book.title;
                const author_name = book.author_name.join(', ');
                const first_publish_year = book.first_publish_year;
                const id = book.lending_edition_s;

                return {id, title, author_name, first_publish_year};
            });
        }

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(books),
                },
            ],
        };
    },
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Open Library MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
});
