from rest_framework.permissions import BasePermission

class IsSuperUserPermission(BasePermission):

    def has_permission(self, request, view):
        return request.user and not request.user.is_blocked and request.user.is_superuser


class IsSuperUserOrOwnerPermission(BasePermission):
    
    def has_object_permission(self, request, view, obj):
        return request.user and (request.user.is_superuser or obj.creator == request.user) and not request.user.is_blocked
