# Itransition Final Task: Personal Collections Management Web Application

## Description

**Frontend**: TypeScript, Next.js, tailwind
**Backend**: Python, Django REST, Postgresql

Create a web application for managing personal collections (such as books, stamps, whiskies, etc. referred to as "items" below).

Non-authenticated users have read-only access. They can use search functionality but cannot create collections or items, leave comments, or like items.

Authenticated non-admin users have access to everything except the admin panel.

The admin panel allows user management, including viewing, blocking, unblocking, deleting, granting admin privileges, and revoking admin privileges. An admin sees all pages as their authors, effectively making them the owners of all collections and items.

Only admins or the creators of collections or items can manipulate them (edit, add, delete). Everything is viewable by everyone (except for the admin panel).

Users can register and authenticate through the website.

Each page (in the header at the top) provides full-text search access. Results are always items (e.g., if text is found in a comment, a link to the item with comments is displayed, not a separate comment). If the result is a collection, you can either show any item or generate a link to the collection.

Each user has a personal page where they manage their collections (create, delete, edit). Each collection in the list is a link to a collection page, which includes a table of items with sorting and filtering options and the ability to create a new item, delete, or edit an existing item.

Each collection has a name, description (with markdown formatting support), a theme (one value from a fixed dictionary, e.g., "Books," "Stamps," "Silverware"), and an optional image (uploaded by the user to the cloud).

Additionally, collections allow specifying fields that each item should have. Plus, items have fixed fields (id, name, tags). At the collection level, users can choose any combination from the following available fields for items: 3 integer fields, 3 string fields, 3 multiline text fields, 3 yes/no checkbox fields, and 3 date fields. For each of the selected fields, the user sets the name.

For example, if I collect books, I can choose (add to the standard set of id, name, tags) an additional string field "Author," an additional text "Content," and an additional date field "Publication Year." All fields should be rendered on the item page, and some of them (strings, dates) should be displayed in the table of all items on the collection page.

All items must have tags (users can enter multiple tags; auto-completion is supported—when a user starts typing, a list of tags with corresponding initial letters already in the database is displayed).

On the homepage, you should have:
- A list of the latest added items (name, collection, author).
- A list of the 5 largest collections.
- A tags cloud (when a user clicks on a tag, a list of items is displayed—better to use the search results page).

When an item is open for viewing (by the author or other users), comments are displayed at the bottom. Comments are linear and are always added only at the end (you cannot comment on a comment in the middle). Comments update automatically—when the page is open, and someone else adds a comment, it should appear automatically (a delay of 2-5 seconds is acceptable).

Each item also has likes (not more than one from one user for each item).

The website should support two languages: English and one additional language, such as Polish, Uzbek, Georgian (chosen by the user and saved as a preference). The site should also support two visual themes (skins): light and dark (chosen by the user and saved as a preference).

Optional Requirements (each one will enhance the evaluation):
- Authentication through social networks.
- Add custom fields with a "one of the given list" type with the ability to edit the list of available values.
- Add an arbitrary number of custom fields (not limited to 0, 1, 2, or 3 fields of a certain type).
- Add the ability to export collections to a CSV file.

## Contribution

Feel free to contribute to this repository by creating pull requests or reporting issues if you find any problems with my solutions. Your feedback is valuable to me.

## License

This project is licensed under the [MIT License](LICENSE).
