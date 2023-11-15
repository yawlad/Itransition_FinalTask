import dropbox
from django.conf import settings


def upload_to_dropbox_and_get_url(file_name, image_data):
    
    dropbox_access_token = settings.DROPBOX_ACCESS_TOKEN
    dbx = dropbox.Dropbox(dropbox_access_token)
    image_path = f"/collection_images/{file_name}"
    dbx.files_upload(image_data.read(), image_path)

    shared_link = dbx.sharing_create_shared_link(
                image_path, short_url=False)
            
    direct_link = shared_link.url.replace(
                'www.dropbox.com', 'dl.dropboxusercontent.com')
    return direct_link
