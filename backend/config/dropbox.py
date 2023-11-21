import dropbox
from django.conf import settings


def upload_to_dropbox_and_get_url(file_name, image_data):

    dropbox_access_token = settings.DROPBOX_ACCESS_TOKEN
    dbx = dropbox.Dropbox(dropbox_access_token)
    image_path = f"{settings.DROPBOX_IMAGES_PATH}/{file_name}.jpg"
    dbx.files_upload(image_data.read(), image_path,
                     mode=dropbox.files.WriteMode.overwrite)

    shared_link = dbx.sharing_create_shared_link(
        image_path, short_url=False)

    direct_link = shared_link.url.replace(
        'www.dropbox.com', 'dl.dropboxusercontent.com')
    return direct_link


def delete_from_dropbox(file_name):

    dropbox_access_token = settings.DROPBOX_ACCESS_TOKEN
    dbx = dropbox.Dropbox(dropbox_access_token)
    image_path = f"{settings.DROPBOX_IMAGES_PATH}/{file_name}.jpg"

    dbx.files_delete(image_path)


def create_image_link(collection_name, image_data):
    if image_data:
        direct_link = upload_to_dropbox_and_get_url(
            collection_name, image_data)
        return direct_link
