import dropbox
from django.conf import settings
import requests


def get_dropbox_access_token():
    token_url = "https://api.dropbox.com/oauth2/token"
    refresh_data = {
        "refresh_token": settings.DROPBOX_REFRESH_TOKEN,
        "grant_type": "refresh_token",
    }
    auth = (settings.DROPBOX_APP_KEY, settings.DROPBOX_APP_SECRET)
    response = requests.post(token_url, data=refresh_data, auth=auth)
    if response.status_code == 200:
        access_token = response.json()["access_token"]
        return access_token
    else:
        print("Error")
        return None


def upload_to_dropbox_and_get_url(file_name, image_data):
    dropbox_access_token = get_dropbox_access_token()
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

    dropbox_access_token = get_dropbox_access_token()
    dbx = dropbox.Dropbox(dropbox_access_token)
    image_path = f"{settings.DROPBOX_IMAGES_PATH}/{file_name}.jpg"

    dbx.files_delete(image_path)


def create_image_link(collection_name, image_data):
    if image_data:
        direct_link = upload_to_dropbox_and_get_url(
            collection_name, image_data)
        return direct_link
